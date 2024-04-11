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
        send("{\"type\": \"newmessage\",\"content\": \"" + message + "\"}");
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
        // The close codes are documented in class org.java_websocket.framing.CloseFrame
        System.out.println(
                "Connection closed by " + (remote ? "remote peer" : "us") + " Code: " + code + " Reason: "
                        + reason);
    }

    @Override
    public void onError(Exception ex) {
        ex.printStackTrace();
        // if the error is fatal then onClose will be called additionally
    }

}
