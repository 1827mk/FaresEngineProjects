package com.nbu.fares.web;
import com.nbu.fares.domain.Travel;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;

@RooWebJson(jsonObject = Travel.class)
@Controller
@RequestMapping("/travels")
@RooWebScaffold(path = "travels", formBackingObject = Travel.class)
public class TravelController {
}
