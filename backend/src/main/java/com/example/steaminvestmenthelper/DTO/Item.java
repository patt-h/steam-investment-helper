package com.example.steaminvestmenthelper.DTO;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "items")
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "market_hash_name")
    private String marketHashName;

    @Column(name = "price")
    private String boughtPrice;

    @Column(name = "quantity")
    private String quantity;
}
