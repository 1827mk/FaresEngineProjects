* Run Test
mvn clean compile -Dspring.profiles.active=test-derby -Dtest=[class name of test] test

* Run Jetty
mvn clean compile -Dmaven.test.skip=true -Djetty.port=1516 jetty:run

* RUN Deploy to tomcat HRMS_PY
mvn clean compile package -Dmaven.test.skip=true tomcat7:redeploy -P deploy-ss-dev-derby-server

*Run Create structure
mvn clean compile -Dspring.profiles.active=create-structure-derby -Dmaven.test.skip=true -Djetty.port=8083 jetty:run -P create-derby-server

test