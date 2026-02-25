<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('calificaciones', function (Blueprint $table) {
            $table->id();

            // Relaciones
            $table->foreignId('pedido_id')->unique()->constrained('pedidos');
            $table->foreignId('cliente_id')->constrained('usuarios');
            $table->foreignId('farmacia_id')->constrained('farmacias');
            $table->foreignId('repartidor_id')->nullable()->constrained('usuarios');

            // Calificaciones
            $table->tinyInteger('puntuacion_farmacia')->checkBetween([1, 5])->nullable();
            $table->tinyInteger('puntuacion_repartidor')->checkBetween([1, 5])->nullable();
            $table->text('comentario')->nullable();

            $table->timestamp('fecha_calificacion')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calificaciones');
    }
};
