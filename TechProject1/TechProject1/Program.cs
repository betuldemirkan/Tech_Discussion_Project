using System;

class Program
{

    static char[,] matris;
    static int[] player;
    static int enemiesLeft = 4;
    static int step;
    static int satirPlayer;
    static int sutunPlayer;
    static int ilksatir;
    static bool enemyVarMi;

    static void Main()
    {
        oyunubaslat();

        Console.WriteLine("oyuna hoşgeldiniz");

        while (enemiesLeft > 0)
        {

            duzlemiyazdir();
            hareketler();

            Thread.Sleep(1000);
            Console.Clear();

        }



    }

    static void oyunubaslat()
    {
        matris = new char[8, 8];
        player = new int[] { 0, 0 };
        oyunculariyerlestir();



    }
    static void oyunculariyerlestir()
    {

        Random rastgele = new Random(Guid.NewGuid().GetHashCode()); int randomSatir()
        {
            int randomSatir = rastgele.Next(0, 8);
            return randomSatir;
        }
        int randomSutun()
        {
            int randomSutun = rastgele.Next(0, 8);
            return randomSutun;
        }
        satirPlayer = randomSatir();
        sutunPlayer = randomSutun();
        ilksatir = satirPlayer;
        matris[satirPlayer, sutunPlayer] = 'P';

        matris[randomSatir(), randomSutun()] = 'E';
        matris[randomSatir(), randomSutun()] = 'E';
        matris[randomSatir(), randomSutun()] = 'E';
        matris[randomSatir(), randomSutun()] = 'E';

    }
    static void duzlemiyazdir()
    {
        Console.WriteLine("*****************************");
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                Console.Write(matris[i, j] + " ");
            }
            Console.WriteLine();
        }
        Console.WriteLine("*****************************");
        Console.WriteLine("Adım sayısı: " + step);
    }
    static void hareketler()
    {


        for (int i = 0; i < 8; i++)
        {


            if (matris[satirPlayer, i] == 'P' && i == 7)
            {
                if (matris[satirPlayer, sutunPlayer] == 'E')
                {
                    enemiesLeft--;
                }
                matris[satirPlayer, sutunPlayer] = ' ';
                satirPlayer++;
                
                step++;

                matris[satirPlayer, sutunPlayer] = 'P';
            }
            else if (matris[satirPlayer, i] == 'P')
            {
                continue;
            }
            else if (matris[satirPlayer, i] == 'E')
            {
                matris[satirPlayer, sutunPlayer] = ' ';
                matris[satirPlayer, i] = ' ';
                step += (Math.Abs(sutunPlayer - i)) + 1;
                sutunPlayer = i;
                matris[satirPlayer, sutunPlayer] = 'P';
                enemiesLeft--;
                break;

            }
            else if (i == 7 && satirPlayer != 7)
            {
                if (matris[satirPlayer, sutunPlayer] == 'E')
                {
                    enemiesLeft--;
                }
                matris[satirPlayer, sutunPlayer] = ' ';

                satirPlayer++;
                if (matris[satirPlayer, sutunPlayer] == 'E')
                {
                    enemiesLeft--;
                }
                step++;

                matris[satirPlayer, sutunPlayer] = 'P';
            }
            else if (satirPlayer == 7)
            {
                if (matris[satirPlayer, i] == 'E')
                {
                    matris[satirPlayer, sutunPlayer] = ' ';
                    matris[satirPlayer, i] = ' ';
                    step += (Math.Abs(sutunPlayer - i)) + 1;
                    sutunPlayer = i;
                    matris[satirPlayer, sutunPlayer] = 'P';
                    enemiesLeft--;

                    matris[satirPlayer, sutunPlayer] = ' ';
                    satirPlayer = 0;
                    if (matris[satirPlayer, sutunPlayer] == 'E')
                    {
                        enemiesLeft--;
                    }
                    step++;
                    matris[satirPlayer, sutunPlayer] = 'P';

                }
                else if (i == 7)
                {
                    matris[satirPlayer, sutunPlayer] = ' ';
                    satirPlayer = 0;
                    if (matris[satirPlayer, sutunPlayer] == 'E')
                    {
                        enemiesLeft--;
                    }
                    step++;
                    matris[satirPlayer, sutunPlayer] = 'P';

                }
            }
        
        }
        static bool satirKontrol()
        {
            for (int i = 0; i < 8; i++)
            {
                if (matris[satirPlayer, i] == 'E')
                {
                    enemyVarMi = true;
                    break;
                }
                else
                {

                    enemyVarMi = false;
                    break;
                }

            }
            return enemyVarMi;

        }

    }
}