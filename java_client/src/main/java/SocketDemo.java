import io.socket.client.IO;
import io.socket.client.Socket;

import java.net.URISyntaxException;
import java.util.Arrays;

/**
 * @author honey
 * @date 2023/7/5
 */
public class SocketDemo {
    public static void main(String[] args) throws URISyntaxException {
        IO.Options options = new IO.Options();
        options.query = "token=helloworld";
        final Socket socket = IO.socket("ws://127.0.0.1:3000", options);
        String[] arg = {"java hello"};

        socket.emit("chat", arg, object -> {
            System.out.println((String)object[0]);
        });

        socket.on("connect_error", reason -> {
            System.out.println(Arrays.toString(reason));
        });

        socket.connect();
    }
}
