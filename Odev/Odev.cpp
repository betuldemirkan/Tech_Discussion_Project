#include <iostream>
#include <cstdlib>
#include <ctime>
#include <cmath>

struct OyunDurumu {
    char matris[8][8];
    int vezirX, vezirY;
    int sahX[4], sahY[4];
};



int MinHamleSayisiniBul(OyunDurumu& oyun, int baslangicNoktasi, int bitisNoktasi) {
    int xUzaklik = abs(oyun.sahX[baslangicNoktasi] - oyun.sahX[bitisNoktasi]);
    int yUzaklik = abs(oyun.sahY[baslangicNoktasi] - oyun.sahY[bitisNoktasi]);

    return std::max(xUzaklik, yUzaklik);
}

int main() {
    OyunDurumu oyun;
    //matris
    for (int i = 0; i < 8; ++i) {
        for (int j = 0; j < 8; ++j) {
            oyun.matris[i][j] = '-';
        }
    }

    //vezir ve þahlarýn baþlangýç konumu
    srand(time(0));

    oyun.vezirX = rand() % 8;
    oyun.vezirY = rand() % 8;

    for (int i = 0; i < 4; ++i) {
        do {
            oyun.sahX[i] = rand() % 8;
            oyun.sahY[i] = rand() % 8;
        } while ((oyun.sahX[i] == oyun.vezirX && oyun.sahY[i] == oyun.vezirY) ||
            (i > 0 && oyun.sahX[i] == oyun.sahX[i - 1] && oyun.sahY[i] == oyun.sahY[i - 1]));
    }

    //konumlarýna harflendirme yapýmý
    oyun.matris[oyun.vezirX][oyun.vezirY] = 'V';
    for (int i = 0; i < 4; ++i) {
        oyun.matris[oyun.sahX[i]][oyun.sahY[i]] = 'S';
    }

    std::cout << "Baslangic Durumu:\n";
    //baþlangýç matrisi
    for (int i = 0; i < 8; ++i) {
        for (int j = 0; j < 8; ++j) {
            std::cout << oyun.matris[i][j] << " ";
        }
        std::cout << std::endl;
    }
    std::cout << std::endl;

    int toplamHamle = 0;

    toplamHamle += MinHamleSayisiniBul(oyun, -1, 0);

    for (int i = 0; i < 3; ++i) {
        toplamHamle += MinHamleSayisiniBul(oyun, i, i + 1);
    }

    std::cout << "Toplam hamle sayisi: " << toplamHamle << std::endl;

    return 0;
}
