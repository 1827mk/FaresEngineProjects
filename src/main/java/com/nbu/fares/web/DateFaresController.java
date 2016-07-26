package com.nbu.fares.web;
import com.nbu.fares.domain.DateFares;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;

@RooWebJson(jsonObject = DateFares.class)
@Controller
@RequestMapping("/datefareses")
@RooWebScaffold(path = "datefareses", formBackingObject = DateFares.class)
public class DateFaresController {
}
