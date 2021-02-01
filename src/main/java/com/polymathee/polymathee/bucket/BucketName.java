package com.polymathee.polymathee.bucket;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public enum BucketName {

    PROFILE_NAME("polymathee");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    /* public String getBucketName() {
        return bucketName;
    }
     */
}
