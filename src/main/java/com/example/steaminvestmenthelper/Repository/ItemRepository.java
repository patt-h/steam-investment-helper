package com.example.steaminvestmenthelper.Repository;

import com.example.steaminvestmenthelper.DTO.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, String> {

}
