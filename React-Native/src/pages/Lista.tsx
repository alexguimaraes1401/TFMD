import { useContext, useEffect, useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Navigate } from "../Components/Routes";
import api from "../services/api";

export default function Lista() {
  const { token } = useContext(Navigate);
  const headers = ["Nome", "E-mail", "Mensagem"];
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(data.length / 5);
  const list = data
    .filter((_, i) => {
      const range = [page * maxPage, page * maxPage + 5];
      if (i > range[0] && i <= range[1]) {
        return _;
      }
    })
    .map((m: any) => {
      return [m.name, m.email, m.message];
    });

  useEffect(() => {
    api
      .get("contact", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const selectPage = (targetPage: number) => {
    if (targetPage < 0 || targetPage > maxPage) {
      return false;
    }

    setPage(targetPage);
  };

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista</Text>
        <Table style={styles.table}>
          <Row
            data={headers}
            style={styles.head}
            textStyle={{ color: "#334155", fontWeight: "bold" }}
          />
          <Rows
            data={list}
            style={styles.rows}
            textStyle={{ color: "#334155" }}
          />
          <View style={styles.viewButtons}>
            <Pressable
              style={styles.buttons}
              onPress={() => selectPage(page - 1)}
            >
              <Text style={styles.arrows}>{"<"}</Text>
            </Pressable>
            <Text style={styles.pagination}>
              {page + 1} / {maxPage + 1}
            </Text>
            <Pressable
              style={styles.buttons}
              onPress={() => selectPage(page + 1)}
            >
              <Text style={styles.arrows}>{">"}</Text>
            </Pressable>
          </View>
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 60,
  },
  container: {
    borderRadius: 30,
    backgroundColor: "#94a3b8",
    padding: 25,
    gap: 10,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 40,
    marginBottom: 15,
  },
  table: {
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "#6b7280",
  },
  head: {
    borderWidth: 2,
    padding: 5,
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb",
  },
  rows: {
    padding: 5,
    borderWidth: 1,
    backgroundColor: "#d1d5db",
    borderColor: "#9ca3af",
  },
  viewButtons: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#64748b",
  },
  buttons: {
    width: 80,
    height: 50,
    backgroundColor: "#4b5563",
  },
  pagination: {
    color: "white",
  },
  arrows: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
});
