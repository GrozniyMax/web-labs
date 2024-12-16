package com.web.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import com.web.stuff.Bean;
import com.web.stuff.LocalDateTimeTypeAdapter;
import com.web.stuff.Point;
import com.web.stuff.Row;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.Optional;

@WebServlet("/check-area")
public class AreaCheckServler extends HttpServlet {

    private final Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeTypeAdapter())
            .create();


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            LocalDateTime startTime = LocalDateTime.now();

            Point p = getPointPayload(req);

            boolean result = calculate(p);
            Row r = new Row(p, startTime, LocalDateTime.now(), result);

            Bean bean = (Bean) req.getSession().getAttribute("bean");
            if (bean == null) {
                bean = new Bean();
                req.getSession().setAttribute("bean", bean);
            }
            bean.addRow(r);
            resp.setStatus(200);
            resp.getWriter().write(gson.toJson(r));

        }catch (IllegalArgumentException | JsonSyntaxException e){

            resp.setStatus(400);
            resp.getWriter().println(String.format("%s : %s", e.getClass().getName(), e.getMessage()));

        }catch (Exception e){

            resp.setStatus(500);
            resp.getWriter().println(String.format("%s : %s", e.getClass().getName(), e.getMessage()));
        }finally {
            resp.getWriter().flush();
            resp.getWriter().close();
        }
    }


    private boolean calculate(Float x, Float y, Float r) {
        if (x>0 && y>0){
            return false;
        } else if (x>0 && y<0) {
            return x*x+y*y<=(r*r/4);
        } else if (x<0 && y>0) {
            return y<=2*x+r;
        } else if (x==0 && y==0) {
            return true;
        }else {
            return (x>-r)&&(y>-r);
        }
    }

    private boolean calculate(Point p) {
        return calculate(p.getX(), p.getY(), p.getR());
    }

    public Point getPointPayload(HttpServletRequest request) throws IOException {
        return gson.fromJson(request.getReader(), Point.class);
    }

}
