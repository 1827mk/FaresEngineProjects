// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import com.nbu.fares.domain.Transport;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect Transport_Roo_Json {
    
    public String Transport.toJson() {
        return new JSONSerializer()
        .exclude("*.class").deepSerialize(this);
    }
    
    public String Transport.toJson(String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").deepSerialize(this);
    }
    
    public static Transport Transport.fromJsonToTransport(String json) {
        return new JSONDeserializer<Transport>()
        .use(null, Transport.class).deserialize(json);
    }
    
    public static String Transport.toJsonArray(Collection<Transport> collection) {
        return new JSONSerializer()
        .exclude("*.class").deepSerialize(collection);
    }
    
    public static String Transport.toJsonArray(Collection<Transport> collection, String[] fields) {
        return new JSONSerializer()
        .include(fields).exclude("*.class").deepSerialize(collection);
    }
    
    public static Collection<Transport> Transport.fromJsonArrayToTransports(String json) {
        return new JSONDeserializer<List<Transport>>()
        .use("values", Transport.class).deserialize(json);
    }
    
}
