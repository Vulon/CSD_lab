package com.csd.Lab1;

import com.csd.Services.DivisorService;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;


public class Lab1Handler {
    public void handle(){
        System.out.println("Starting server");
        try(ServerSocket serverSocket = new ServerSocket(12345)) {
            System.out.println("Server started");
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected");
            String line = "";
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            line = in.readLine();
            System.out.println("Read: "  + line);
            DivisorService service = new DivisorService(line);


            BufferedWriter out = new BufferedWriter(new OutputStreamWriter(clientSocket.getOutputStream()));
            out.write(service.getResult());
            out.flush();
            System.out.println("Wrote. Closing connection");

            in.close();
            out.close();
        }catch (IOException e ){
            e.printStackTrace();
        }
    }
}
