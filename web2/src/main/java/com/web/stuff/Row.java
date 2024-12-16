package com.web.stuff;

import java.time.LocalDateTime;

public class Row {

    private Point point;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Boolean result;

    public Row(Point point, LocalDateTime startTime, LocalDateTime endTime, Boolean result) {
        this.point = point;
        this.startTime = startTime;
        this.endTime = endTime;
        this.result = result;
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "Row{" +
                "point=" + point +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", result=" + result +
                '}';
    }
}
