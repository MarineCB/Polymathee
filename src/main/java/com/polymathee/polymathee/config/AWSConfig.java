package com.polymathee.polymathee.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWSConfig {

    @Bean
    public AmazonS3 s3 () {
        AWSCredentials awsCredentials = new BasicAWSCredentials(
                "AKIAJSOSLOGRNHWWV5JQ",
                "oMhgxfACbqpzTlf2+GaMVQ2Vp7Mc79hAXHhB8JnV"
        );

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }

}
