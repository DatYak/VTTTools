import tkinter
import pathlib, os
from tkinter import filedialog
from PIL import ImageTk, Image, ImageDraw

class TokenGenerator(tkinter.Tk):
        
    ally_border = 'Resources/allyTokenBorder.png'
    party_border = 'Resources/partyTokenBorder.png'
    enemy_border = 'Resources/enemyTokenBorder.png'
    token_mask = 'Resources/tokenMask.png'
    
    def __init__(self):
        tkinter.Tk.__init__(self)
        self.current_path = pathlib.Path(__file__).parent.resolve()
        self.title("Yak's Token Generator")
        self.geometry("350x350")

        self.posHint = tkinter.Label(self, text= "Click and drag to position." )
        self.posHint.pack()
        self.scaleHint = tkinter.Label(self, text= "Scroll mouse wheel to scale.")
        self.scaleHint.pack()
        self.enterHint = tkinter.Label(self, text= "Enter key to save token and close \n Right mouse to save and open a new token")
        self.enterHint.pack()
        self.bordersHint = tkinter.Label(self, text= "Q, W, & E change between borders")
        self.bordersHint.pack()

        #Tkinter image setup
        self.canvas = tkinter.Canvas(self, name="token_canvas", bg="black", width=200, height=200)
        self.canvas.pack()

        self.border_file = self.enemy_border

        self.pick_new_image()

        self.canvas.bind("<ButtonPress-1>", self.on_button_press)
        self.canvas.bind("<B1-Motion>", self.on_move_press)
        self.canvas.bind("<MouseWheel>", self.on_mousewheel)
        self.canvas.bind("<ButtonPress-3>", self.on_enter_continue)
        self.bind_all("<Return>", self.on_enter)
        self.bind_all("<Escape>", self.close)
        self.bind_all("q", lambda event, b=1: self.change_border(border=b))
        self.bind_all("w", lambda event, b=2: self.change_border(border=b))
        self.bind_all("e", lambda event, b=3: self.change_border(border=b))
        tkinter.Tk.focus_force(self)

    def pick_new_image(self):
        self.file_path = filedialog.askopenfilename()

        self.token_image = ImageTk.PhotoImage(file=self.file_path)
        self.token_canvas_image = self.canvas.create_image(0,0,image=self.token_image)
        self.last_x = None
        self.last_y = None
        self.image_scale = 1
        
        self.apply_border()

    def change_border(self, border):
        if (border == 1): self.border_file = self.enemy_border
        if (border == 2): self.border_file = self.party_border
        if (border == 3): self.border_file = self.ally_border
        self.apply_border()

    def apply_border(self):
        self.border_image = ImageTk.PhotoImage(file=os.path.join(self.current_path, self.border_file))
        self.border_canvas_image = self.canvas.create_image(100,100,image=self.border_image)

    def on_button_press(self, event):
            # save mouse drag start position
            self.last_x = event.x
            self.last_y = event.y

    def on_move_press(self, event):
        curX, curY = (event.x, event.y)

        self.canvas.move(self.token_canvas_image,  curX- self.last_x, curY - self.last_y)
        self.last_x = curX
        self.last_y = curY

    def on_mousewheel(self, event):
        image = Image.open(self.file_path)
        self.image_scale += event.delta / 4000
        (width, height) = image.size
        width = int(width*self.image_scale)
        height = int(height*self.image_scale)
        resized_image = image.resize((width, height), Image.BILINEAR)
        self.token_image = ImageTk.PhotoImage(resized_image)
        self.canvas.itemconfig(self.token_canvas_image, image=self.token_image)

    def on_enter(self, event):
        self.save_image()
        self.close()

    def on_enter_continue(self, event):
        self.save_image()
        self.pick_new_image()

    def save_image (self):
        art_image = Image.open(os.path.join(self.current_path, self.file_path), 'r')
        art_image = art_image.convert(mode='RGBA')
        border_image = Image.open(os.path.join(self.current_path, self.border_file), 'r')
        border_image = border_image.convert(mode='RGBA')
        (width, height) = art_image.size
        width = int(width*self.image_scale)
        height = int(height*self.image_scale)
        art_image = art_image.resize((width, height), Image.BILINEAR)

        (offsetX, offsetY) = self.canvas.coords(self.token_canvas_image)
        offsetX = int(width/2) - offsetX
        offsetY = int(height/2) - offsetY
        left = offsetX
        upper = offsetY
        right = left + 200
        lower = upper + 200
        combined_image = art_image.crop((left, upper, right, lower))
        combined_image.alpha_composite(border_image)

        mask_image = Image.open(os.path.join(self.current_path, self.token_mask), 'r')
        mask_image.convert(mode='RGBA')
        
        final_image = Image.new(size=(200,200), color=(0,0,0,0),mode='RGBA')
        final_image.paste(im=combined_image, mask=mask_image)

        savepath = filedialog.asksaveasfile(initialfile="T_.png",defaultextension=".png",filetypes=[("All Files","*.*")])
        final_image.save(savepath.name)

    def close(self, event=None):
        self.quit()

app = TokenGenerator()
app.mainloop()