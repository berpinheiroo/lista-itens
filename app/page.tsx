"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

export default function Home() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [open, setOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems((prevItems) => [...prevItems, inputValue]);
      setInputValue(""); // Limpa o input após adicionar
    }
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setEditValue(items[index]);
  };

  const handleSaveEdit = () => {
    const updatedItems = [...items];
    updatedItems[editIndex] = editValue;
    setItems(updatedItems);
    setEditIndex(null);
    setEditValue("");
  };

  const handleRemoveItem = () => {
    setItems((prevItems) => prevItems.filter((_, index) => index !== itemToRemove));
    setOpen(false);
    setItemToRemove(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-xl">Minha Lista de Itens</h1>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="mb-2 w-100"
        placeholder="Adicione um item..."
      />
      <Button onClick={handleAddItem} className="bg-sky-500 hover:bg-sky-700">
        Adicionar Item
      </Button>
      <ul className="mt-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between py-2">
            {editIndex === index ? (
              <>
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="mr-2"
                />
                <Button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-700">
                  Salvar
                </Button>
              </>
            ) : (
              <>
                <span className="mr-4">{item}</span>
                <div className="flex items-center">
                  <Button onClick={() => handleEditItem(index)} className="bg-yellow-500 hover:bg-yellow-700 mr-2">
                    Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button onClick={() => setItemToRemove(index)} className="bg-red-500 hover:bg-red-700">
                        Remover
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover Item</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza de que deseja remover este item?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRemoveItem}>Confirmar</AlertDialogAction>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
