package com.nbu.fares.web;
import com.nbu.fares.domain.Location;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;

@RooWebJson(jsonObject = Location.class)
@Controller
@RequestMapping("/locations")
@RooWebScaffold(path = "locations", formBackingObject = Location.class)
public class LocationController {
}
