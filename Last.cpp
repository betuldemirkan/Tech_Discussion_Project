#include <iostream>
#include <stdlib.h>
#include <time.h>

using namespace std;

class Person
{
public:
    int x;
    int y;
};

int move(Person &hero, int dx, int dy)
{
    hero.x += dx;
    hero.y += dy;
    return 1;
}

int checkEncounter(const Person &hero, const Person &enemy)
{
    if (hero.x == enemy.x && hero.y == enemy.y)
    {
        cout << "Encountered an enemy at position: " << enemy.x << "-" << enemy.y << endl;
        return 1;
    }
    return 0;
}

void backToFirst(Person &person, int firstX, int firstY)
{
    person.x = firstX;
    person.y = firstY;
}

int main()
{
    srand(time(NULL));

    Person hero, enemies[4];
    int steps = 0;

    hero.x = rand() % 8;
    hero.y = rand() % 8;

    for (int i = 0; i < 4; ++i)
    {
        enemies[i].x = rand() % 8;
        enemies[i].y = rand() % 8;

        while (checkEncounter(hero, enemies[i]))
        {
            hero.x = rand() % 8;
            hero.y = rand() % 8;
        }
        cout << "Enemy" << i + 1 << " X= " << enemies[i].x << " | Y= " << enemies[i].y << endl;
    }
    cout << "HERO X= " << hero.x << " | Y= " << hero.y << endl;

    int firstX = hero.x;
    int firstY = hero.y;

    const int dx[] = {1, -1, 0, 0, -1, -1, 1, 1};
    const int dy[] = {0, 0, 1, -1, -1, 1, 1, -1};

    int right = 0;
    while (hero.x < 7)
    {
        right += move(hero, 1, 0);
        for (int i = 0; i < 4; i++)
        {
            if (checkEncounter(hero, enemies[i]))
                break;
        }
    }
    cout << "You can go to do RIGHT in " << right << " steps" << endl;
    steps += right;
    backToFirst(hero, firstX, firstY);

    int left = 0;
    while (hero.x > 0)
    {
        left += move(hero, -1, 0);
        for (int i = 0; i < 4; i++)
        {
            if (checkEncounter(hero, enemies[i]))
                break;
        }
    }
    cout << "You can go to do LEFT in " << left << " steps" << endl;
    steps += left;
    backToFirst(hero, firstX, firstY);

    int up = 0;
    while (hero.y < 7)
    {
        up += move(hero, 0, 1);
        for (int i = 0; i < 4; i++)
        {
            if (checkEncounter(hero, enemies[i]))
                break;
        }
    }
    cout << "You can go to do UP in " << up << " steps" << endl;
    steps += up;
    backToFirst(hero, firstX, firstY);

    int down = 0;
    while (hero.y > 0)
    {
        down += move(hero, 0, -1);
        for (int i = 0; i < 4; i++)
        {
            if (checkEncounter(hero, enemies[i]))
                break;
        }
    }
    cout << "You can go to do DOWN in " << down << " steps" << endl;
    steps += down;
    backToFirst(hero, firstX, firstY);

    int leftDown = 0;
    while (hero.y > 0 && hero.x > 0)
    {
        leftDown += move(hero, -1, -1);
        for (int i = 0; i < 4; i++)
        {
            if (checkEncounter(hero, enemies[i]))
                break;
        }
    }
    cout << "You can go to do LEFT DOWN in " << leftDown << " steps" << endl;
    steps += leftDown;
    backToFirst(hero, firstX, firstY);

    int rightDown = 0;
    while (hero.y > 0 && hero.x < 7)
    {
        rightDown += move(hero, 1, -1);
        for (int i = 0; i < 4; i++)
        {
            if (checkEncounter(hero, enemies[i]))
                break;
        }
    }
    cout << "You can go to do RIGHT DOWN in " << rightDown << " steps" << endl;
    steps += rightDown;
    backToFirst(hero, firstX, firstY);

    int rightUp = 0;
    while (hero.y < 7 && hero.x < 7)
    {
        rightUp += move(hero, 1, 1);
        for (int i = 0; i < 4; i++)
        {
            if (checkEncounter(hero, enemies[i]))
                break;
        }
    }
    cout << "You can go to do RIGHT UP in " << rightUp << " steps" << endl;
    steps += rightUp;
    backToFirst(hero, firstX, firstY);

    int leftUp = 0;
    while (hero.y < 7 && hero.x > 0)
    {
        leftUp += move(hero, -1, 1);
        for (int i = 0; i < 4; i++)
        {
            if (checkEncounter(hero, enemies[i]))
                break;
        }
    }
    cout << "You can go to do LEFT UP in " << leftUp << " steps" << endl;
    steps += leftUp;

    cout << "Total number of steps that can be taken= " << steps << endl;

    return 0;
}