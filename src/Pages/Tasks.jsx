import React, { useState } from "react";
import {
  Container, Box, Typography, Tabs, Tab, TextField, Button, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, InputLabel, FormControl
} from "@mui/material";

const priorities = ["Low", "Medium", "High"];
const statuses = ["To Do", "In Progress", "Completed"];
const goals = [
  { id: 1, name: "" }
];

const Tasks = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    title: "", description: "", startDate: "", dueDate: "", endDate: "",
    priority: "Low", status: "To Do", goalId: ""
  });
  const [filter, setFilter] = useState({ status: "", priority: "", goalId: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.title.trim()) return alert("Title is required");
    const newTask = { ...form, id: Date.now() };

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = newTask;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setForm({ title: "", description: "", startDate: "", dueDate: "", endDate: "", priority: "Low", status: "To Do", goalId: "" });
  };

  const handleEdit = (index) => {
    setForm(tasks[index]);
    setEditIndex(index);
    setTabIndex(0);
  };

  const handleDelete = (id) => setTasks(tasks.filter(t => t.id !== id));

  const handleComplete = (id) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, status: "Completed", endDate: new Date().toISOString().split("T")[0] } : t
    );
    setTasks(updated);
  };

  const filteredTasks = tasks.filter(t =>
    (!filter.status || t.status === filter.status) &&
    (!filter.priority || t.priority === filter.priority) &&
    (!filter.goalId || t.goalId === filter.goalId)
  );

  return (
    <Container sx={{ pt: 12 }}>
      <Typography variant="h4" gutterBottom>Tasks</Typography>

      <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)} sx={{ mb: 2 }}>
        <Tab label="Create Task" />
        <Tab label="View Tasks" />
      </Tabs>

      {tabIndex === 0 && (
        <Box component="form" noValidate autoComplete="off" sx={{ bgcolor: '#FFFFFF', p: 3, borderRadius: 2 }}>
          <TextField
            label="Title" name="title" fullWidth required sx={{ mb: 2 }}
            value={form.title} onChange={handleChange}
          />
          <TextField
            label="Description" name="description" fullWidth multiline rows={2} sx={{ mb: 2 }}
            value={form.description} onChange={handleChange}
          />
          <TextField
            label="Start Date" name="startDate" type="date" fullWidth sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }} value={form.startDate} onChange={handleChange}
          />
          <TextField
            label="Due Date" name="dueDate" type="date" fullWidth sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }} value={form.dueDate} onChange={handleChange}
          />
          <TextField
            label="End Date" name="endDate" type="date" fullWidth sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }} value={form.endDate} onChange={handleChange}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select name="priority" value={form.priority} onChange={handleChange}>
              {priorities.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select name="status" value={form.status} onChange={handleChange}>
              {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Linked Goal</InputLabel>
            <Select name="goalId" value={form.goalId} onChange={handleChange}>
              {goals.map(g => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
            </Select>
          </FormControl>

          <Button type="button" variant="contained" sx={{ backgroundColor: '#2B2C28' }} onClick={handleSubmit}>
            {editIndex !== null ? "Update" : "Create"} Task
          </Button>
        </Box>
      )}

      {tabIndex === 1 && (
        <Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
                <MenuItem value="">All</MenuItem>
                {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Priority</InputLabel>
              <Select value={filter.priority} onChange={e => setFilter({ ...filter, priority: e.target.value })}>
                <MenuItem value="">All</MenuItem>
                {priorities.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Goal</InputLabel>
              <Select value={filter.goalId} onChange={e => setFilter({ ...filter, goalId: e.target.value })}>
                <MenuItem value="">All</MenuItem>
                {goals.map(g => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Due</TableCell>
                  <TableCell>Goal</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.map((task, index) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>{goals.find(g => g.id === Number(task.goalId))?.name || "N/A"}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleEdit(index)}>Edit</Button>
                      <Button size="small" color="error" onClick={() => handleDelete(task.id)}>Delete</Button>
                      {task.status !== "Completed" && (
                        <Button size="small" onClick={() => handleComplete(task.id)}>Complete</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default Tasks;