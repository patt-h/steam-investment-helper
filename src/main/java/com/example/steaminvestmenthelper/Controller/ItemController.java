package com.example.steaminvestmenthelper.Controller;

import com.example.steaminvestmenthelper.DTO.Item;
import com.example.steaminvestmenthelper.Repository.ItemRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
public class ItemController {
    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping(value = "/all")
    public List<Item> items() {
        return itemRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public Optional<Item> getItemById(@PathVariable(value = "id") String id) {
        return itemRepository.findById(id);
    }
}
