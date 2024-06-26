package com.wt;

import java.net.URI;
import java.net.URISyntaxException;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import javafx.scene.control.TextArea;

public class WalkieTalkieClient extends WebSocketClient {

    private TextArea output;

    public WalkieTalkieClient(TextArea taOutput) throws URISyntaxException {
        super(new URI("ws://localhost:8080/"));

        output = taOutput;
    }

    public void sendMessage(String message) {
        try {
            send("{\"type\": \"newmessage\",\"content\": \"" + message + "\"}");
        } catch (Exception ex) {
            System.out.println("Can not send message!");
        }
    }

    @Override
    public void onOpen(ServerHandshake handshakedata) {
        System.out.println("opened connection");
    }

    @Override
    public void onMessage(String message) {
        output.setText(message.substring(1, message.length() - 1));
    }

    @Override
    public void onClose(int code, String reason, boolean remote) {
    }

    @Override
    public void onError(Exception ex) {
        System.out.println("Error occured!");
    }

}
