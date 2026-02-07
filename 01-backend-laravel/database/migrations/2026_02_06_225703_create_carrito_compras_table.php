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
        Schema::create('carrito_compras', function (Blueprint $table) {
            $table->id();

            // Relaciones
            $table->foreignId('cliente_id')->constrained('usuarios')->onDelete('cascade');
            $table->foreignId('farmacia_id')->constrained('farmacias');
            $table->foreignId('stock_farmacia_id')->constrained('stock_farmacia');

            // Detalles
            $table->integer('cantidad')->default(1);
            $table->timestamp('fecha_agregado')->useCurrent();

            // Índice único
            $table->unique(['cliente_id', 'stock_farmacia_id'], 'unique_cliente_producto');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carrito_compras');
    }
};
