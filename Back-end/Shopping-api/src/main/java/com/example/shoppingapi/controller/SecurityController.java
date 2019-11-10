package com.example.shoppingapi.controller;

import com.example.shoppingapi.config.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class SecurityController {
    @Autowired
    private IAuthenticationFacade authenticationFacade;

    public String getCurrentUserName() {
        Authentication authentication = authenticationFacade.getAuthentication();
        return authentication.getName();

    }

}