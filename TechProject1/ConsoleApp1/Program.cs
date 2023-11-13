using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 3x3 boyutunda bir matris oluştur
        int[,] matris = new int[3, 3];

        // Matris elemanlarına isimleri atamak için bir sözlük kullan
        Dictionary<string, Tuple<int, int>> isimliElemanlar = new Dictionary<string, Tuple<int, int>>();

        // İsimli elemanları tanımla
        isimliElemanlar["Player"] = Tuple.Create(0, 2); // Geçerli indeksleri kullan

        try
        {
            matris[0, 2] = 13;
            // İsimle matris elemanına erişim
            int deger = matris[isimliElemanlar["Player"].Item1, isimliElemanlar["Player"].Item2];

            // Matris elemanını yazdır
            Console.WriteLine($"Matris[" + isimliElemanlar["Player"].Item1 + "," + isimliElemanlar["Player"].Item2 + "]: " + deger);
        }
        catch (IndexOutOfRangeException)
        {
            Console.WriteLine("Hata: İndeks matris sınırları dışında.");
        }
    }
}