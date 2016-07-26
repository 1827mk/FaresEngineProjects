package com.nbu.fares.web;
import com.nbu.fares.domain.Fares;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;

@RooWebJson(jsonObject = Fares.class)
@Controller
@RequestMapping("/fareses")
@RooWebScaffold(path = "fareses", formBackingObject = Fares.class)
public class FaresController {
}
