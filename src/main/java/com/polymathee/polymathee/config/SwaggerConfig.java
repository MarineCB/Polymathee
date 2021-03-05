package com.polymathee.polymathee.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .globalOperationParameters(
                Arrays.asList(
                    new ParameterBuilder()
                        .name("Authorization")
                        .description("Bearer")
                        .defaultValue("Bearer ")
                        .modelRef(new ModelRef("string"))
                        .parameterType("header")
                        .required(false).build()
                    )
            )
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.polymathee.polymathee"))
            .paths(PathSelectors.any())
            .build();
    }
}




