import java.util.ArrayList;
import java.util.Random;

public class Main {

    public static ArrayList<int[]> enemyPositions = new ArrayList<>();
    public static final int numberOfEnemies = 4;

    public static void main(String[] args) {
        // Oyun tahtasını oluştur
        char[][] board = new char[8][8];

        // Oyuncu karakteri
        char player = 'P';

        // Düşman karakteri
        char enemy = 'E';

        // Oyun tahtasını başlat
        initializeBoard(board, player, enemy);

        // Düşman pozisyonlarını belirle
        for (int i = 0; i < numberOfEnemies; i++) {
            int[] randomPosition = {getRandomCoordinate(), getRandomCoordinate()};
            while (hasObstacles(enemyPositions, randomPosition)) {
                randomPosition[0] = getRandomCoordinate();
                randomPosition[1] = getRandomCoordinate();
            }
            enemyPositions.add(randomPosition);
        }

        // Oyuncu pozisyonunu belirle
        int[] playerPosition = {getRandomCoordinate(), getRandomCoordinate()};
        while (hasObstacles(enemyPositions, playerPosition)) {
            playerPosition[0] = getRandomCoordinate();
            playerPosition[1] = getRandomCoordinate();
        }

        // Oyuncu ve düşman pozisyonlarını tahtaya yerleştir
        placePiece(board, player, playerPosition);
        for (int i = 0; i < numberOfEnemies; i++) {
            placePiece(board, enemy, enemyPositions.get(i));
        }

        // Oyun tahtasını yazdır
        printBoard(board);

        // Oyuncunun toplam adım sayısını hesapla
        int totalMoves = calculateTotalMoves(board, player);

        // Sonuçları yazdır
        System.out.println("Oyuncunun toplam adım sayısı: " + totalMoves);
    }

    // Oyun tahtasını başlat
    private static void initializeBoard(char[][] board, char player, char enemy) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                board[i][j] = '-';
            }
        }
    }

    // Düşman pozisyonlarını belirle
    private static void placePiece(char[][] board, char piece, int[] position) {
        board[position[0]][position[1]] = piece;
    }

    // Oyun tahtasını yazdır
    private static void printBoard(char[][] board) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
    }

    // Oyuncunun toplam adım sayısını hesapla
    private static int calculateTotalMoves(char[][] board, char player) {
        int totalMoves = 0;

        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                if (board[i][j] == player) {
                    // Oyuncu taşı bulunduğu konumda
                    // Yukarı, aşağı, sola, sağa ve çaprazlara hareket edebilir
                    totalMoves += countValidMoves(board, i, j);
                }
            }
        }

        return totalMoves;
    }

    // Belirli bir konumdan başlayarak geçerli adım sayısını hesapla
    private static int countValidMoves(char[][] board, int x, int y) {
        int validMoves = 0;
        int[] dx = {-1, 1, 0, 0, -1, -1, 1, 1};
        int[] dy = {0, 0, -1, 1, -1, 1, -1, 1};

        for (int i = 0; i < dx.length; i++) {
            int newX = x + dx[i];
            int newY = y + dy[i];

            while (isValidMove(board, newX, newY)) {
                validMoves++;

                if (board[newX][newY] == 'E') {
                    // Eğer düşman bulunduysa, saldırı gerçekleştir ve dur
                    break;
                }

                newX += dx[i];
                newY += dy[i];
            }
        }

        return validMoves;
    }

    // Geçerli bir hamle mi kontrol et
    private static boolean isValidMove(char[][] board, int x, int y) {
        return x >= 0 && x < board.length && y >= 0 && y < board[0].length && board[x][y] == '-';
    }

    // Rastgele bir koordinat al
    private static int getRandomCoordinate() {
        return new Random().nextInt(8);
    }

    // Engeller kontrolü
    private static boolean hasObstacles(ArrayList<int[]> positions, int[] newPosition) {
        for (int[] pos : positions) {
            if (pos[0] == newPosition[0] && pos[1] == newPosition[1]) {
                return true;
            }
        }
        return false;
    }
}
