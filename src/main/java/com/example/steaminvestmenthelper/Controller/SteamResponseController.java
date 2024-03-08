package com.example.steaminvestmenthelper.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin
public class SteamResponseController {
    @GetMapping(value = "/api/steam/{marketHashName}")
    public String steamResponse(@PathVariable(value = "marketHashName") String marketHashName) throws UnsupportedEncodingException {
        String url = "https://steamcommunity.com/market/priceoverview/?appid=730&currency=6&market_hash_name=" + marketHashName;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}
