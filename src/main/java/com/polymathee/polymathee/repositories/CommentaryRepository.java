package com.polymathee.polymathee.repositories;

import com.polymathee.polymathee.dao.Commentary;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface CommentaryRepository extends CrudRepository<Commentary, Integer>, JpaSpecificationExecutor<Commentary> {

    List<Commentary> findAll();

    @Query("SELECT sdto FROM Commentary sdto WHERE sdto.publicationId.id=:id")
    List<Commentary> findAllByPublicationId(Integer id);

    @Query("SELECT sdto FROM Commentary sdto WHERE sdto.userId.id=:id")
    List<Commentary> findAllByUserId(Integer id);

    void deleteById(int id);

    @Modifying
    @Query("DELETE FROM Commentary com  WHERE com.publicationId.id =:commentId ")
    void deleteComment(int commentId);

    Commentary findCommentaryById(Integer id);

    @Query("SELECT c FROM Commentary c ORDER BY c.upvote DESC")
    List<Commentary> SortByUpvote();

    @Query("Select c from Commentary c where c.report > :report ORDER BY c.report DESC")
    List<Commentary> findCommentByReportDesc(int report);
}
