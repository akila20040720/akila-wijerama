import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import json
import os
import shutil

JSON_FILE = os.path.join(os.path.dirname(__file__), "data.json")

# ---------------- JSON Helpers ---------------- #

def load_json():
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        # Create default data if file doesn't exist
        default_data = {
            "skills": [],
            "projects": [],
            "education": [],
            "experience": [],
            "contactInfo": []
        }
        save_json(default_data)
        return default_data

def save_json(data):
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

# ---------------- App ---------------- #

class PortfolioApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Portfolio JSON Manager")
        self.root.geometry("700x500")

        self.data = load_json()
        self.current_section = tk.StringVar(value="skills")

        self.create_ui()
        self.refresh_list()

    # ---------------- UI ---------------- #

    def create_ui(self):
        # Section selector
        ttk.Label(self.root, text="Select Section").pack(pady=5)
        self.section_menu = ttk.Combobox(
            self.root,
            values=["skills", "projects", "education"],
            textvariable=self.current_section,
            state="readonly"
        )
        self.section_menu.pack()
        self.section_menu.bind("<<ComboboxSelected>>", lambda e: self.refresh_list())

        # Main frame
        frame = tk.Frame(self.root)
        frame.pack(fill="both", expand=True, pady=10)

        # Listbox
        self.listbox = tk.Listbox(frame, width=30)
        self.listbox.pack(side="left", fill="y", padx=10)
        self.listbox.bind("<<ListboxSelect>>", self.load_selected)

        # Form
        self.form_frame = tk.Frame(frame)
        self.form_frame.pack(side="left", fill="both", expand=True)

        self.fields = {}
        self.build_form()

        # Buttons
        btn_frame = tk.Frame(self.root)
        btn_frame.pack(pady=10)

        tk.Button(btn_frame, text="Add", width=10, command=self.add_item).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Update", width=10, command=self.update_item).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Delete", width=10, command=self.delete_item).pack(side="left", padx=5)

    # ---------------- Dynamic Form ---------------- #

    def build_form(self):
        for widget in self.form_frame.winfo_children():
            widget.destroy()

        self.fields.clear()
        section = self.current_section.get()

        field_map = {
            "skills": ["name", "icon"],
            "projects": ["title", "description", "image", "live", "code"],
            "education": ["title", "description", "image", "link"]
        }

        for field in field_map[section]:
            ttk.Label(self.form_frame, text=field.capitalize()).pack(anchor="w")
            if field == "description":
                entry = tk.Text(self.form_frame, height=4)
            else:
                entry = ttk.Entry(self.form_frame)

            entry.pack(fill="x", pady=3)
            self.fields[field] = entry
            
            # Add image upload button for image fields
            if field == "image" and section in ["projects", "education"]:
                tk.Button(self.form_frame, text="Upload Image", bg="lightblue", 
                         command=lambda e=entry, s=section: self.upload_image(s, e)).pack(fill="x", pady=2)

    # ---------------- List Handling ---------------- #

    def refresh_list(self):
        self.build_form()
        self.listbox.delete(0, tk.END)

        section = self.current_section.get()
        if section in self.data and self.data[section]:
            for item in self.data[section]:
                label = item.get("name") or item.get("title")
                self.listbox.insert(tk.END, label)

    def load_selected(self, event):
        if not self.listbox.curselection():
            return

        index = self.listbox.curselection()[0]
        section = self.current_section.get()
        item = self.data[section][index]

        for field, widget in self.fields.items():
            if isinstance(widget, tk.Text):
                widget.delete("1.0", tk.END)
                widget.insert("1.0", item.get(field, ""))
            else:
                widget.delete(0, tk.END)
                widget.insert(0, item.get(field, ""))

    # ---------------- Image Upload ---------------- #

    def upload_image(self, section, entry_widget):
        file_path = filedialog.askopenfilename(
            title="Select an image",
            filetypes=[("Image files", "*.png *.jpg *.jpeg *.gif *.bmp"), ("All files", "*.*")]
        )
        
        if not file_path:
            return
        
        try:
            # Get the public folder path
            script_dir = os.path.dirname(__file__)
            project_root = os.path.dirname(script_dir)
            public_folder = os.path.join(project_root, "public", "Images", section.capitalize())
            
            # Create folder if it doesn't exist
            os.makedirs(public_folder, exist_ok=True)
            
            # Get filename
            filename = os.path.basename(file_path)
            
            # Copy file to public folder
            dest_path = os.path.join(public_folder, filename)
            shutil.copy2(file_path, dest_path)
            
            # Set the relative path in the entry field
            relative_path = f"/Images/{section.capitalize()}/{filename}"
            entry_widget.delete(0, tk.END)
            entry_widget.insert(0, relative_path)
            
            messagebox.showinfo("Success", f"Image uploaded to {relative_path}")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to upload image: {str(e)}")

    # ---------------- CRUD ---------------- #

    def get_form_data(self):
        data = {}
        for field, widget in self.fields.items():
            if isinstance(widget, tk.Text):
                data[field] = widget.get("1.0", tk.END).strip()
            else:
                data[field] = widget.get().strip()
        return data

    def add_item(self):
        section = self.current_section.get()
        item = self.get_form_data()

        if not any(item.values()):
            messagebox.showerror("Error", "Fill at least one field")
            return

        self.data[section].append(item)
        save_json(self.data)
        self.refresh_list()

    def update_item(self):
        if not self.listbox.curselection():
            messagebox.showerror("Error", "Select an item to update")
            return

        index = self.listbox.curselection()[0]
        section = self.current_section.get()
        self.data[section][index] = self.get_form_data()

        save_json(self.data)
        self.refresh_list()

    def delete_item(self):
        if not self.listbox.curselection():
            messagebox.showerror("Error", "Select an item to delete")
            return

        index = self.listbox.curselection()[0]
        section = self.current_section.get()

        del self.data[section][index]
        save_json(self.data)
        self.refresh_list()

# ---------------- Run ---------------- #

root = tk.Tk()
app = PortfolioApp(root)
root.mainloop()
