package com.polymathee.polymathee.services;

import org.springframework.web.multipart.MultipartFile;

public interface AWSService {

    void uploadFile(MultipartFile multipartFile);
    byte[] downloadFile(String Key);
}
