package com.example.steaminvestmenthelper.Controller;

import com.example.steaminvestmenthelper.DTO.Item;
import com.example.steaminvestmenthelper.Repository.ItemHistoryRepository;
import com.example.steaminvestmenthelper.Repository.ItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class ItemController {
    private final ItemRepository itemRepository;
    private final ItemHistoryRepository itemHistoryRepository;

    public ItemController(ItemRepository itemRepository, ItemHistoryRepository itemHistoryRepository) {
        this.itemRepository = itemRepository;
        this.itemHistoryRepository = itemHistoryRepository;
    }

    @GetMapping(value = "/all")
    public List<Item> items() {
        return itemRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public Optional<Item> getItemById(@PathVariable(value = "id") String id) {
        return itemRepository.findById(id);
    }

    @PostMapping(value = "/addItem")
    public List<Item> addItem(@RequestBody List<Item> item) {
        return itemRepository.saveAll(item);
    }

    @PutMapping(value = "/update")
    public Item updateItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void deleteItem(@PathVariable(value = "id") String id) {
        itemHistoryRepository.deleteByItemID(id);
        itemRepository.deleteById(id);
    }
}
