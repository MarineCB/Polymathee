package com.polymathee.polymathee.services.impl;

import java.io.*;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.repositories.CommentaryRepository;
import com.polymathee.polymathee.repositories.PublicationRepository;
import com.polymathee.polymathee.services.AWSService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;

import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class AWSServiceImpl implements AWSService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AWSServiceImpl.class);

    @Autowired
    private AmazonS3 amazonS3;
    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Autowired
    private PublicationRepository publicationRepository;


    @Override
    @Async
    public void uploadFile(final MultipartFile multipartFile, int id) {
        LOGGER.info("File upload in progress.");
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            uploadFileToS3Bucket(bucketName, file, id);
            LOGGER.info("File upload is completed.");
            // file.delete();  // To remove the file locally created in the project folder. //Théo

        } catch (final AmazonServiceException ex) {
            LOGGER.info("File upload is failed.");
            LOGGER.error("Error= {} while uploading file.", ex.getMessage());
        }
    }

    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {
            LOGGER.error("Error converting the multi-part file to file= ", ex.getMessage());
        }
        return file;
    }

    private void uploadFileToS3Bucket(final String bucketName, final File file, int id) {

        String File= "";
        Publication publication;
        publication = publicationRepository.findPublicationById(id);
        final String uniqueFileName =  file.getName();
        File = publication.getUserId().getId() +"-"+ uniqueFileName;
        publicationRepository.updateFileById(id,File);
        LOGGER.info("Uploading file with name= " + uniqueFileName);
        final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, File, file);
        amazonS3.putObject(putObjectRequest);
    }


    public byte[] downloadFile(String fileName) {
        byte[] content = new byte[0];
        S3Object s3Object = amazonS3.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            content = IOUtils.toByteArray(inputStream);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return content;
    }

    public void deleteFile(int id){

        try {
            Publication publication;
            publication = publicationRepository.findPublicationById(id);
            amazonS3.deleteObject(bucketName,publication.getFile());

        } catch (AmazonServiceException e) {

            System.out.println(e.getErrorMessage());

        } finally {

            if(amazonS3 != null) {
                amazonS3.shutdown();
            }
        }
    }


    public void updatebyID(int id) {

        Publication publication;
        publication = publicationRepository.findPublicationById(id);

        String ID = String.valueOf(publication.getUserId().getId());
        String file = ID + "-" + publication.getFile();

        publicationRepository.updateFileById(id, file);

    }



}


