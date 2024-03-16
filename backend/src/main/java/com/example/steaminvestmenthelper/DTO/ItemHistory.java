package com.example.steaminvestmenthelper.DTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "item_history")
@AllArgsConstructor
@NoArgsConstructor
public class ItemHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int historyID;

    @Column(name = "itemID")
    private String itemID;

    @Column(name = "date")
    private String date;

    @Column(name = "price")
    private String price;
}
