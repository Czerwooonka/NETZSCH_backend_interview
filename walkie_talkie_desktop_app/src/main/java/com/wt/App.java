package com.wt;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextArea;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URISyntaxException;

/**
 * JavaFX App
 */
public class App extends Application {

    private static Scene scene;
    private static WalkieTalkieClient client;

    @Override
    public void start(Stage stage) throws IOException {
        scene = new Scene(loadFXML("walkie_talkie"), 640, 480);
        stage.setScene(scene);
        stage.show();

        try {
            TextArea taOutput = (TextArea) scene.lookup("#outputField");
            client = new WalkieTalkieClient(taOutput);
            client.connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        TextArea taInput = (TextArea) scene.lookup("#inputField");
        taInput.textProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(final ObservableValue<? extends String> observable, final String oldValue,
                    final String newValue) {
                client.sendMessage(newValue);
            }
        });
    }

    @Override
    public void stop() throws Exception {
        client.close();
        super.stop();
    }

    static void setRoot(String fxml) throws IOException {
        scene.setRoot(loadFXML(fxml));
    }

    private static Parent loadFXML(String fxml) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource(fxml + ".fxml"));
        return fxmlLoader.load();
    }

    public static void main(String[] args) {
        launch();
    }

}