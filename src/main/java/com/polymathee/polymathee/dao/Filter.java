package com.polymathee.polymathee.dao;

import lombok.Data;

@Data
public class Filter {
    private String filter;

    public String getFilter() {
        return this.filter;
    }
}
