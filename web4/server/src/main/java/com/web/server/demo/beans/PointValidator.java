package com.web.server.demo.beans;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PointValidator {

    public boolean validate(Double x, Double y, Double r) {
        if (x == null || y == null || r == null) {
            return false;
        }
        if (x > 0 && y > 0) {
            return false;
        } else if (x > 0 && y < 0) {
            return x * x + y * y <= (r * r / 4);
        } else if (x < 0 && y > 0) {
            return y <= 2 * x + r;
        } else if (x == 0 && y == 0) {
            return true;
        } else {
            return (x > -r) && (y > -r);
        }
    }
}
