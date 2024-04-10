package com.wt;

import java.io.IOException;
import javafx.fxml.FXML;

public class WalkieTalkieController {

    @FXML
    private void switchToPrimary() throws IOException {
        App.printMessage();
    }
}