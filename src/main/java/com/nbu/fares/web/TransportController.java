package com.nbu.fares.web;
import com.nbu.fares.domain.Transport;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;

@RooWebJson(jsonObject = Transport.class)
@Controller
@RequestMapping("/transports")
@RooWebScaffold(path = "transports", formBackingObject = Transport.class)
public class TransportController {
}
