package com.polymathee.polymathee.rsql;

import org.springframework.data.jpa.domain.Specification;

import cz.jirutka.rsql.parser.ast.AndNode;
import cz.jirutka.rsql.parser.ast.ComparisonNode;
import cz.jirutka.rsql.parser.ast.OrNode;
import cz.jirutka.rsql.parser.ast.RSQLVisitor;


public class CustomRsqlVisitor<T> implements RSQLVisitor<Specification<T>,Void> {

    private GenericRsqlSpecBuilder<T> builder;

    public CustomRsqlVisitor() {
        builder = new GenericRsqlSpecBuilder<T>();
    }


    @Override
    public Specification<T> visit(final AndNode node, Void unused) {
        return builder.createSpecification(node);
    }

    @Override
    public Specification<T> visit(final OrNode node, Void unused) {
        return builder.createSpecification(node);
    }

    @Override
    public Specification<T> visit(final ComparisonNode node, Void unused) {
        return builder.createSpecification(node);
    }
}
