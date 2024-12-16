package com.web.stuff;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Bean implements Serializable {

    private List<Row> rows = new ArrayList<>();

    public Row getRow(int rowNum) {
        return rows.get(rowNum);
    }

    public void addRow(Row row) {
        rows.add(row);
    }

    public List<Row> getRows() {
        return rows;
    }

    public void setRows(List<Row> rows) {
        this.rows = rows;
    }

    public void clearRows() {
        rows.clear();
    }
}
