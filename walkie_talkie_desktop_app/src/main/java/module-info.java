module com.wt {
    requires javafx.controls;
    requires javafx.fxml;

    opens com.wt to javafx.fxml;
    exports com.wt;
}
