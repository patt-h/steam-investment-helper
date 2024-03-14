package com.example.steaminvestmenthelper.Repository;

import com.example.steaminvestmenthelper.DTO.ItemHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ItemHistoryRepository extends JpaRepository<ItemHistory, String> {

    @Query(value = "SELECT * FROM item_history i WHERE i.itemID = ?", nativeQuery = true)
    List<ItemHistory> findAllByItemID(String itemID);

    @Query(value = "SELECT * FROM item_history i WHERE i.date = ?", nativeQuery = true)
    List<ItemHistory> findAllByDate(String date);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM item_history i WHERE i.itemID = ?", nativeQuery = true)
    void deleteByItemID(String itemID);

}
