<%@ page import="com.web.stuff.Row" %>
<%@ page import="com.web.stuff.Bean" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
    <style>
        /* Добавляем немного стилей для улучшения отображения */
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        header {
            margin-bottom: 20px;
        }

        table {
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 8px;
            text-align: center;
            vertical-align: top; /* Выравнивание по верхнему краю */
        }

        caption {
            caption-side: top; /* Устанавливаем заголовок таблицы сверху */
            text-align: left; /* Выравниваем заголовок по левому краю */
        }

        #plot {
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<header>
    Тараненко Максим Сергеевич<br>
    Р3211 <br>
    409664<br>
    <a href="form.html">Ссылка на форму</a>
</header>

<table width="100%">
    <tr>
        <td>
            <table id="result" width="100%">
                <caption>Last requests</caption>
                <thead>
                <tr>
                    <th scope="col">x</th>
                    <th scope="col">y</th>
                    <th scope="col">R</th>
                    <th scope="col">Result</th>
                    <th scope="col">Start time</th>
                    <th scope="col">Execution time</th>
                </tr>
                </thead>
                <tbody id="result-body">

                <%
                    if (session.getAttribute("bean") == null) {
                        session.setAttribute("bean", new Bean());
                    }
                    for (Row w : ((Bean) session.getAttribute("bean")).getRows()) {
                        out.println("<tr>");
                        out.println(String.format("<td>%.2f</td>", w.getPoint().getX()));
                        out.println(String.format("<td>%.2f</td>", w.getPoint().getY()));
                        out.println(String.format("<td>%.2f</td>", w.getPoint().getR()));
                        out.println(String.format("<td>%b</td>", w.getResult()));
                        out.println(String.format("<td>%s</td>", w.getStartTime().toString()));
                        out.println(String.format("<td>%s</td>", w.getEndTime().toString()));
                        out.println("</tr>");
                    }
                %>
                </tbody>
            </table>
        </td>
        <td>
            <div style="text-align: center;">
                <canvas id="plot" width="500" height="500">
                </canvas>
                <form>
                    <label for="r-input">Введите значение R:</label><br>
                    <select id="r-input">
                        <option value="1">R=1</option>
                        <option value="1.5">R=1.5</option>
                        <option value="2">R=2</option>
                        <option value="2.5">R=2.5</option>
                        <option value="3">R=3</option>
                    </select><br>
                </form>
            </div>
        </td>
    </tr>
</table>

<script src="interaction.js"></script>
</body>
</html>  out.println(String.format("<td>%.2f</td>", w.getPoint().getX()));
                        out.println(String.format("<td>%.2f</td>", w.getPoint().getY()));
                        out.println(String.format("<td>%.2f</td>", w.getPoint().getR()));
                        out.println(String.format("<td>%b</td>", w.getResult()));
                        out.println(String.format("<td>%s</td>", w.getStartTime().toString()));
                        out.println(String.format("<td>%s</td>", w.getEndTime().toString()));
                        out.println("</tr>");
                    }
                %>
