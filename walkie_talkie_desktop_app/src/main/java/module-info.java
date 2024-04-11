module com.wt {
    requires javafx.controls;
    requires javafx.fxml;
    requires org.java_websocket;

    opens com.wt to javafx.fxml;

    exports com.wt;
}
