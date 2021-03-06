package com.polymathee.polymathee.services;

import org.springframework.web.multipart.MultipartFile;

public interface AWSService {

    void uploadFile(MultipartFile multipartFile, int id);
    byte[] downloadFile(String Key);
    void updatebyID(int id);
    void deleteFile(int id);
}
