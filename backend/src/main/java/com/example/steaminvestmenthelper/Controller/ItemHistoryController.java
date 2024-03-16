package com.example.steaminvestmenthelper.Controller;

import com.example.steaminvestmenthelper.DTO.ItemHistory;
import com.example.steaminvestmenthelper.Repository.ItemHistoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/history")
public class ItemHistoryController {
    private final ItemHistoryRepository itemHistoryRepository;

    public ItemHistoryController(ItemHistoryRepository itemHistoryRepository) {
        this.itemHistoryRepository = itemHistoryRepository;
    }

    @GetMapping(value = "/date/{date}")
    public List<ItemHistory> getAllHistory(@PathVariable(value = "date") String date) {
        return itemHistoryRepository.findAllByDate(date);
    }

    @GetMapping(value = "/{itemID}")
    public List<ItemHistory> getHistory(@PathVariable(value = "itemID") String itemID) {
        return itemHistoryRepository.findAllByItemID(itemID);
    }

    @PostMapping(value = "/addHistory")
    public List<ItemHistory> addHistory(@RequestBody List<ItemHistory> itemHistory) {
        return itemHistoryRepository.saveAll(itemHistory);
    }
}
