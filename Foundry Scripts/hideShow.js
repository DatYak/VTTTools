let updates = canvas.tokens.controlled.map( token => { return { _id : token.id, hidden : !token.data.hidden }});

canvas.scene.updateEmbeddedDocuments("Token", updates)