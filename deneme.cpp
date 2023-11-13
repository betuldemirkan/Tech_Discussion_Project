#include <iostream>
#include <cstdlib>
#include <ctime>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Seed'i güncelle
    srand(time(0));

    int num_simulations = 1;
    int total_steps_to_enemy = 0;

    for (int i = 0; i < num_simulations; ++i) {
        // Karakterin başlangıç pozisyonu
        vector<int> character_position = { rand() % 8, rand() % 8 };

        // Düşmanların başlangıç pozisyonları
        vector<vector<int>> enemy_positions;
        for (int j = 0; j < 4; ++j) {
            vector<int> enemy_position = { rand() % 8, rand() % 8 };
            enemy_positions.push_back(enemy_position);
        }

        int steps = 0;
        int step_size = 0;
        // Karakter düşmanları öldürüp oyunu bitirene kadar adımlarını atar
        while (!enemy_positions.empty()) {
            // Rastgele bir düşman seç
            vector<int> target_enemy = enemy_positions[rand() % enemy_positions.size()];

            // Hedef düşmanın pozisyonuna doğru hareket et
            int direction_x = (target_enemy[0] - character_position[0]);
            int direction_y = (target_enemy[1] - character_position[1]);

             // 1 ile 3 arasında rastgele adım sayısı

            character_position[0] += direction_x ;
            character_position[1] += direction_y ;
            if (direction_x < 0)
                direction_x = direction_x * (-1);
            if (direction_y < 0)
                direction_y = direction_y * (-1);

            steps = steps + direction_x+ direction_y;

            // Hedef düşmanın pozisyonuna ulaşıldığında düşmanı öldür
            enemy_positions.erase(
                remove_if(enemy_positions.begin(), enemy_positions.end(),
                    [character_position](const vector<int>& enemy) {
                        return enemy == character_position;
                    }),
                enemy_positions.end()
                        );

            // Düşmanlar tamamen öldürüldüğünde döngüyü bitir
            if (enemy_positions.empty()) {
                break;
            }
        }

        total_steps_to_enemy += steps;
    }


    cout << "Toplam adım sayısı: " << total_steps_to_enemy << endl;

    return 0;
}
