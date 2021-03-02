package com.polymathee.polymathee.rsql;

import cz.jirutka.rsql.parser.ast.AndNode;
import cz.jirutka.rsql.parser.ast.ComparisonNode;
import cz.jirutka.rsql.parser.ast.OrNode;

public interface RSQLVisitor<R,A> {

    R visit(AndNode node, A param);

    R visit(OrNode node, A param);

    R visit(ComparisonNode node, A param);
}
