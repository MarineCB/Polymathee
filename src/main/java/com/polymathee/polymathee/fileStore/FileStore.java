package com.polymathee.polymathee.fileStore;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FileStore {

    private final AmazonS3 s3;

    @Autowired
    public FileStore(AmazonS3 S3) {
        this.s3 = S3;
    }

    public void save(String path, String filename, Optional<Map<String,String>> optionalMetadata, InputStream inputStream) {

        ObjectMetadata metadata = new ObjectMetadata();
        optionalMetadata.ifPresent(map -> {
            if(!map.isEmpty()){
                map.forEach((key,value) -> metadata.addUserMetadata(key,value));
            }
        });

        try {
            s3.putObject(path, filename, inputStream, metadata);
        } catch (AmazonServiceException e) {
            throw new IllegalStateException("Failed to store file to S3", e);
        }
    }
}
