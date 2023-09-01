import tkinter
from tkinter import filedialog
from PIL import ImageTk, Image, ImageDraw

ally_border = 'allyTokenBorder.png'
party_border = 'partyTokenBorder.png'
enemy_border = 'enemyTokenBorder.png'
token_mask = 'tokenMask.png'


class TokenGenerator(tkinter.Tk):
    def __init__(self):
        tkinter.Tk.__init__(self)

        #Tkinter image setup
        self.canvas = tkinter.Canvas(self, name="token generator", bg="black", width=200, height=200)
        self.canvas.pack()

        self.border_file = enemy_border

        self.pick_new_image()

        self.canvas.bind("<ButtonPress-1>", self.on_button_press)
        self.canvas.bind("<B1-Motion>", self.on_move_press)
        self.canvas.bind_all("<MouseWheel>", self.on_mousewheel)
        self.canvas.bind("<ButtonPress-2>", self.on_enter)
        self.canvas.bind("<KP_1>", lambda n=1: self.change_border(n))
        self.canvas.bind("<KP_2>", lambda n=2: self.change_border(n))
        self.canvas.bind("<KP_3>", lambda n=3: self.change_border(n))

    def pick_new_image(self):
        self.file_path = filedialog.askopenfilename()

        self.token_image = ImageTk.PhotoImage(file=self.file_path)
        self.token_canvas_image = self.canvas.create_image(0,0,image=self.token_image)
        self.last_x = None
        self.last_y = None
        self.image_scale = 1
        
        self.apply_border()

    def change_border(self, border):
        if (border == 1): self.border_file = enemy_border
        if (border == 2): self.border_file = party_border
        if (border == 3): self.border_file = ally_border
        self.apply_border()

    def apply_border(self):
        self.border_image = tkinter.PhotoImage(file=self.border_file)
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
        art_image = Image.open(self.file_path, 'r')
        art_image = art_image.convert(mode='RGBA')
        border_image = Image.open(self.border_file, 'r')
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

        mask_image = Image.open(token_mask, 'r')
        mask_image.convert(mode='RGBA')
        
        final_image = Image.new(size=(200,200), color=(0,0,0,0),mode='RGBA')
        final_image.paste(im=combined_image, mask=mask_image)

        savepath = filedialog.asksaveasfile(initialfile="token.png",defaultextension=".png",filetypes=[("All Files","*.*")])
        final_image.save(savepath.name)

        self.pick_new_image()

app = TokenGenerator()
app.mainloop()